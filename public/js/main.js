document.addEventListener("DOMContentLoaded", () => {
  const toasts = document.querySelectorAll(".toast");
  toasts.forEach((toast) => {
    setTimeout(() => {
      toast.style.transition = "opacity 280ms ease";
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 320);
    }, 2200);
  });
});
