let select = document.getElementById("selectPerson");
for (let i = 1; i <= 20; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = `${i}`;
  select.appendChild(option);
}
