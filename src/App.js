import arrDown from '../src/images/arrDown.svg';
import chart from '../src/images/chart.svg';
import { useState, useEffect } from 'react';


function App() {

  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [buySellButton, setBuySellButton] = useState('buy');
  const [unit, setUnit] = useState(1);
  const amount = 26140.58; 
  const quantity = 0.0638;
  const [price1, setPrice1] = useState([]) ;
  const [price2, setPrice2] = useState([]) ;
  const [quantity1, setQuantity1] = useState([]) ;
  const [quantity2, setQuantity2] = useState([]) ;

  const buttons = [
    { text: '1', bgColor: '#ffffffcc', textColor: '#ffffffcc' },
    { text: '5', bgColor: '#ffffffcc', textColor: '#ffffffcc' },
    { text: '10', bgColor: '#ffffffcc', textColor: '#ffffffcc' },
    { text: '20', bgColor: '#ffffffcc', textColor: '#ffffffcc' },
  ];

  const handleButtonClick = (index, value) => {
    setActiveButtonIndex(index);
    setUnit(value);
  };

  const handleBuySellButtonClick = (buttonType) => {
    setBuySellButton(buttonType);
  };

  useEffect(() => {
    // Define the range for random number
    const range = 100;
    

    // Function to generate random numbers with 2 decimal places within the specified range
    function generateRandomNumbers(amount, range) {
      const min = amount - range;
      const max = amount + range;
      const randomNumbers = [];

      for (let i = 0; i < 6; i++) {
        const randomNumber = (Math.random() * (max - min) + min).toFixed(2);
        randomNumbers.push(Number(randomNumber));
      }
      return randomNumbers;
    }

    // Function to generate random non-negative numbers with 4 or 5 decimal places within the specified range
    function generateRandomNonNegativeDecimal(quantity, range) {
      const range1 = 1;
      const min = Math.max(0, quantity - range1);
      const max = quantity + range1;
      const randomNumbers = [];

      for (let i = 0; i < 6; i++) {
        const decimalPlaces = Math.random() > 0.5 ? 4 : 5; // Randomly choose 4 or 5 decimal places
        const randomNumber = (Math.random() * (max - min) + min).toFixed(decimalPlaces);
        randomNumbers.push(Number(randomNumber));
      }
      return randomNumbers;
    }

    // Function to update and display both random numbers
    function updateRandomNumbers() {
      const randomPrice = generateRandomNumbers(amount, range);
      const randomPrice1 = generateRandomNumbers(amount, range);
      const randomQuantity = generateRandomNonNegativeDecimal(quantity, range);
      const randomQuantity1 = generateRandomNonNegativeDecimal(quantity, range);
      setPrice1(randomPrice);
      setPrice2(randomPrice1);
      setQuantity1(randomQuantity);
      setQuantity2(randomQuantity1);
    }

    // Initial call to display random numbers
    updateRandomNumbers();

    // Update random numbers every 8 seconds
    const interval = setInterval(updateRandomNumbers, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [amount, quantity]);



  return (
    <>
    <div className=" flex justify-center items-center h-[100vh] w-full md:w-[450px] text-white md:mx-auto bg-[#121212]">
      <div className=" p-3 md:p-6 flex w-full h-full">
        <div className=' w-full'>
          <div className=" py-3 flex w-full justify-between items-center border-b border-[#cbcbcb6c]">
            <span className="">
              <p className=" font-Nunito-Sans font-semibold text-xl flex flex-row">BTC/USDT <span className=" text-[#30B278] text-base font-normal flex flex-row items-center ml-3">  0.014% <img src={ arrDown } className=' h-4 w-4 ' alt="" /></span></p>
              <p className=' text-[#ffffffcc] font-Nunito-Sans text-base'>Perpetual</p>
            </span>
            <img src={ chart } className=' w-4 h-4' alt="" />
          </div>
          <div className=' w-full py-4 flex flex-row space-x-4 border-b border-[#cbcbcb6c]'>
            <button className=' font-Nunito text-sm px-4 py-2 rounded-2xl text-whitef3ad26 bg-[#f3ad26]'>Isolated</button>
            <button className=' font-Nunito text-sm px-4 py-2 rounded-2xl text-whitef3ad26 bg-[#f3ad26]'>10x</button>
          </div>

          <div className=' py-3 flex flex-row justify-between border-b border-[#cbcbcb6c]'>
            <div className=' w-[59%]'>
            <div className='w-full h-[35px] bg-[#1e1e1e] rounded-3xl'>
                <button
                  className={`w-1/2 h-full ${
                    buySellButton === 'buy' ? 'bg-[#f3ad26] rounded-3xl' : ''
                  } text-base font-Nunito font-normal`}
                  onClick={() => handleBuySellButtonClick('buy')}
                >
                  Buy
                </button>
                <button
                  className={`w-1/2 h-full ${
                    buySellButton === 'sell' ? 'bg-[#f3ad26] rounded-3xl' : ''
                  } text-base font-Nunito font-normal`}
                  onClick={() => handleBuySellButtonClick('sell')}
                >
                  Sell
                </button>
              </div>
              <div className=' w-full flex justify-between py-3 px-1'>
                <p className=' font-Nunito-Sans text-sm font-medium text-[#ffffffcc]'>Available</p>
                <p className=' font-Nunito-Sans text-sm font-medium text-[#ffffffcc]'>0</p>
              </div>
              <div className=' px-1 w-full space-y-3'>
                <input type="text" placeholder="Limit" className=' w-full p-2 text-sm font-Nunito-Sans font-medium text-center bg-[#1e1e1e] rounded-lg' readOnly value={"Limit"}/>
                <input type="text" placeholder="Amount" className=' w-full p-2 text-sm font-Nunito-Sans font-medium text-center text-[#ffffffcc] bg-[#1e1e1e] rounded-lg' readOnly value={unit * amount}/>
                <input type="text" placeholder="0" className=' w-full p-2 text-sm font-Nunito-Sans font-medium text-center text-[#ffffffcc] bg-[#1e1e1e] rounded-lg' value={unit}/>
              </div>
              <div className='flex w-full justify-between pt-2 px-1'>
                {buttons.map((button, index) => (
                  <label
                    key={index}
                    className={`text-center flex flex-col font-Nunito-Sans text-xs ${
                      activeButtonIndex === index ? 'text-[#f3ad26]' : 'text-[#ffffffcc]'
                    }`}
                  >
                    <button
                      className={`w-[40px] h-1 ${
                        activeButtonIndex === index ? 'bg-[#f3ad26]' : 'bg-[#ffffffcc]'
                      }`}
                      onClick={() => handleButtonClick(index, button.text)}
                    ></button>
                    {button.text}
                  </label>
                ))}
              </div>
              <div className=' w-full flex justify-between pb-1 pt-3 px-1'>
                <p className=' font-Nunito-Sans text-sm font-medium text-[#ffffffcc]'>Unit</p>
                <p className=' font-Nunito-Sans text-sm font-medium text-[#fff]'>{unit}</p>
              </div>
              <div className=' w-full flex justify-between pb-3 px-1'>
                <p className=' font-Nunito-Sans text-sm font-medium text-[#ffffffcc]'>Cost</p>
                <p className=' font-Nunito-Sans text-sm font-medium text-[#fff]'>{amount}</p>
              </div>
              <button className=' w-full bg-[#f3ad26] h-[45px] rounded-md capitalize font-Nunito-Sans font-medium text-lg'>{buySellButton}</button>
            </div>
            <div className=' w-[39%]'>
              <div className=' w-full'>
                  <table className=' w-full px-1'>
                    <thead>
                      <tr>
                        <th className=' text-base font-Nunito-Sans text-[#ffffffcc] font-medium text-left'>Price</th>
                        <th className=' text-base font-Nunito-Sans text-[#ffffffcc] font-medium text-right'>Quantity</th>
                      </tr>
                    </thead>
                    <tbody className=' text-sm font-Nunito font-normal'>
                      {price1.map((price, index) => (
                        <tr key={index}>
                          <td className=' text-left text-red-400'>{price}</td>
                          <td className=' text-right'>{quantity1[index]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className=' w-full'>
                    <input type="text" value={amount} className=' w-full text-sm font-Nunito-Sans font-medium p-1.5 border text-center border-[#ffffff3b] rounded-lg bg-transparent' />
                </div>
                <div className=' w-full'>
                  <table className=' w-full px-1'>
                    <thead>
                      <tr>
                        <th className=' text-base font-Nunito-Sans text-[#ffffffcc] font-medium text-left'>Price</th>
                        <th className=' text-base font-Nunito-Sans text-[#ffffffcc] font-medium text-right'>Quantity</th>
                      </tr>
                    </thead>
                    <tbody className=' text-sm font-Nunito font-normal'>
                      {price2.map((price, index) => (
                        <tr key={index}>
                          <td className=' text-left text-[#30B278]'>{price}</td>
                          <td className=' text-right'>{quantity2[index]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
