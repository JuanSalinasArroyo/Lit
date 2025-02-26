export const fetchPackageInfo = async (
  pkgName: string,
  signal: AbortSignal
) => {
  await new Promise((r) => setTimeout(r, 1000));
  const response = await fetch(`https://registry.npmjs.org/${pkgName}`, {
    signal,
  });

  if (response.status == 200) {
    return response.json();
  }
  throw new Error("Este es un error");
};
