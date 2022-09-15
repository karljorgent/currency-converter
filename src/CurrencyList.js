import './currencyList.css';

function CurrencyList(props) {
    const currencies = props.currencies
  
    const list = []
  
    currencies.forEach((currency) => {
      list.push(<li>{currency}</li>)
    })
  
    return (
      <div className='list'>
        {list}
      </div>
    )
  }
  


export default CurrencyList;