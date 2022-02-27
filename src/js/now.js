const lastEditObj = document.querySelector("#lastEdit");
const date = new Date(Date.parse(lastEditObj.innerHTML));

function prettyDate(time) {
  // source: https://stackoverflow.com/a/7641822
  // let date = new Date( String(time || "").replace(/-/g, "/") );
  let diff = (new Date().getTime() - time.getTime()) / 1000;
  console.log( diff )
  let day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return "Invalid date";

  return (
    (day_diff < 3 && "recently") ||
    (day_diff < 7 && "within the last week") ||
    (day_diff < 30 && "within the last month") ||
    (day_diff < 90 && "within the last three months") ||
    "some time ago"
  );
}

lastEditObj.innerHTML = prettyDate(date);
