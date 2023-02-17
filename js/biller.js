const qty = document.querySelector('#qty');
const rate = document.querySelector('#rate');
const amount = document.querySelector('#itemvalue');

// inputs.forEach(input => input.addEventListener('click',(e) =>{
//     console.log(e);
// }));
console.log(document.body);

qty.addEventListener('blur', e =>{
    const qty = parseInt(e.target.value)
    const rate = parseInt(e.target.parentElement.parentElement.querySelector('#rate').innerText)
    const total = rate * qty;
    e.target.parentElement.parentElement.querySelector('#itemvalue').innerText = total
    console.log(rate, qty, total);
})