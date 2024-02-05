import Swal from "sweetalert2";

export const msgSuccess = (message: string) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 2000,
  });
};
export const confirm = async (title: string) => {
  return await new Promise((resolve, reject) => {
    Swal.fire({
      title: `Want delete ${title} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      resolve(result.isConfirmed);
    });
  });
};
export const msgError = (message: string) => {
  return Swal.fire({
    position: "center",
    icon: "error",
    title: "",
    text: message || "เกิดข้อผิดพลาดบางประการ",
    showConfirmButton: false,
    timer: 2000,
  });
};
