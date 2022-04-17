import axios from "axios";
import SavedImg from "common/types/SavedImg";

export const multiDownload = async (
  savedImg: Array<SavedImg>,
  multipleSelectedImg: number[]
) => {
  const urls: string[] = [];

  multipleSelectedImg.forEach((selected) => {
    urls.push(savedImg[selected]["_id"]);
  });

  const result = await axios({
    method: "post",
    url: "/api/multiDownload",
    data: { urls: urls },
    responseType: "blob",
  });
  const name = result.headers["content-disposition"].split("filename=")[1];
  const url = window.URL.createObjectURL(
    new Blob([result.data], { type: result.headers["content-type"] })
  );
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", name);
  document.body.appendChild(link);
  link.click();
};

export default multiDownload;
