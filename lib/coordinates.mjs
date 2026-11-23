export const axes = ['width', 'height', 'depth'];

// The schema permits one affine term per axis, never executable expressions.
export function resolveVec(vector, dimensions) {
  return vector.map((v, axis) => {
    if (typeof v === 'number') return v;
    const percent = v.indexOf('%');
    return Number(v.slice(0, percent)) * dimensions[axes[axis]] / 100 + Number(v.slice(percent + 1));
  });
}
