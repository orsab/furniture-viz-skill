// Internal macOS backend for prepare.mjs. Public CLI: node tools/prepare.mjs --help.
import AppKit
import Foundation
import PDFKit

struct PreparationError: LocalizedError {
    let message: String
    init(_ message: String) { self.message = message }
    var errorDescription: String? { message }
}

func render(_ page: PDFPage, at prefix: URL) throws {
    guard let raw = page.pageRef else { throw PreparationError("Could not read the PDF page.") }
    let box = raw.getBoxRect(.cropBox).standardized
    let quarterTurn = (Int(raw.rotationAngle) % 180) != 0
    let w = quarterTurn ? box.height : box.width
    let h = quarterTurn ? box.width : box.height
    guard w.isFinite, h.isFinite, w > 0, h > 0 else { throw PreparationError("Invalid PDF page dimensions.") }
    let width = max(1, Int((w / max(w, h) * 2400).rounded()))
    let height = max(1, Int((h / max(w, h) * 2400).rounded()))
    guard let canvas = CGContext(data: nil, width: width, height: height, bitsPerComponent: 8,
        bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue) else {
        throw PreparationError("Could not allocate the page image.")
    }
    let rect = CGRect(x: 0, y: 0, width: CGFloat(width), height: CGFloat(height))
    canvas.setFillColor(gray: 1, alpha: 1)
    canvas.fill(rect)
    // Core Graphics centers small pages without upscaling. Apply the pixel scale
    // ourselves, then let the page transform handle crop origin and rotation.
    canvas.scaleBy(x: rect.width / w, y: rect.height / h)
    let pageRect = CGRect(x: 0, y: 0, width: w, height: h)
    canvas.concatenate(raw.getDrawingTransform(.cropBox, rect: pageRect, rotate: 0, preserveAspectRatio: true))
    canvas.drawPDFPage(raw)
    // Dimension callouts may be annotation appearances, outside the page stream.
    for annotation in page.annotations where annotation.shouldDisplay {
        canvas.saveGState()
        annotation.draw(with: .cropBox, in: canvas)
        canvas.restoreGState()
    }
    guard let image = canvas.makeImage(), let png = NSBitmapImageRep(cgImage: image).representation(using: .png, properties: [:]) else {
        throw PreparationError("Could not encode the page image.")
    }
    try png.write(to: prefix.appendingPathExtension("png"), options: .withoutOverwriting)
    try Data((page.string ?? "").utf8).write(to: prefix.appendingPathExtension("txt"), options: .withoutOverwriting)
}

func run() throws {
    let args = Array(CommandLine.arguments.dropFirst())
    guard args.count >= 2, let pdf = PDFDocument(url: URL(fileURLWithPath: args[1])), !pdf.isLocked, pdf.pageCount > 0 else {
        throw PreparationError("Unreadable, empty or password-protected PDF.")
    }
    if args.count == 2 && args[0] == "info" { print(pdf.pageCount); return }
    guard args.count == 5, args[0] == "render", let first = Int(args[2]), let last = Int(args[3]),
          first >= 1, last >= first, last <= pdf.pageCount, last - first < 48 else { throw PreparationError("Invalid page range.") }
    let output = URL(fileURLWithPath: args[4], isDirectory: true)
    for number in first...last {
        try autoreleasepool {
            guard let page = pdf.page(at: number - 1) else { throw PreparationError("Missing PDF page.") }
            try render(page, at: output.appendingPathComponent(String(format: "page-%04ld", number)))
        }
    }
}

do { try run() } catch {
    FileHandle.standardError.write(Data((error.localizedDescription + "\n").utf8))
    exit(1)
}
