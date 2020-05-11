// var 
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('year');

// add Event 
document.getElementById('loan-form').addEventListener('submit', function(evt)
{
  document.querySelector('.result').style.display = 'none';

  document.querySelector('.loading').style.display = 'block';

  setTimeout(calculateResult, 2000);
  
  evt.preventDefault();
});

// function 

function calculateResult()
{

    const monthlyPayment = document.getElementById('monthlyPayment');
    const totalInterest = document.getElementById('totalInterest');
    const totalPayment = document.getElementById('totalPayment');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)) {
      monthlyPayment.value = monthly.toFixed(2);
      totalPayment.value = (monthly * calculatedPayments).toFixed(2);
      totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
      document.querySelector('.result').style.display = 'block';
    }
    else
    {
      showError();
    }
    document.querySelector('.loading').style.display = 'none';
}

function showError()
{
  let div = document.createElement('div');
  div.className = 'alert alert-danger';
  div.appendChild(document.createTextNode('Please check your numbers'));
  document.querySelector('.card').insertBefore(div, document.getElementById('heading'));
  setTimeout(clearError, 3000);
}

function clearError()
{
  document.querySelector('.alert').remove();
}