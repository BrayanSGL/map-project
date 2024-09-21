export const validateSession = async (loggin = false) => {
  const user = await localStorage.getItem("user");
    if (!user && !loggin) {
    window.location.href = "/administration";
    }
  if (user && loggin) {
    window.location.href = "/add-route";
  }
  return user;
};
