export const exportPdf = (viz: any, name: string) => {
  viz
    .exportPdf({
      documentSize: "",
      aspectRatio: 2,
      orientation: "landscape",
    })
    .then((link: any) => {
      fetch(`${link}`)
        .then((res) => res.blob())
        .then((blob) => {
          const _url = window.URL.createObjectURL(blob);
          download(_url, `${name}.pdf`);
        });
    });
};

export const exportExcel = (viz: any, name: string) => {
  viz.exportData().then((link: any) => {
    fetch(`${link}`)
      .then((res) => res.blob())
      .then((blob) => {
        const _url = window.URL.createObjectURL(blob);
        download(_url, `${name}.csv`);
      });
  });
};

const download = (url: any, title: any) => {
  const a = document.createElement('a');
  a.href = url;
  a.setAttribute('download', title);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export default download;
