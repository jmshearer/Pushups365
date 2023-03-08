import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('Renders Button Bar', () => {
  render(<App />);
  const linkElement = screen.getByText(/±/i);
  expect(linkElement).toBeInTheDocument();
});

test('Adding and subtracting values works', () => {
  render(<App />);

  //Open button bar  
  fireEvent.click(screen.getByText("±"));
    
  //Add 10 until we hit the max  
  var currentValue=-1;
  var maxValue=0;
  var cnt=0;

  const targetValueElement = screen.getByTestId("targetVerticalProgressBarValue");
  const currentValueElement = screen.getByTestId("currentVerticalProgressBarValue");
  while(currentValue<maxValue){        
    cnt++;
    if(screen.queryByText("±") !== null){
      fireEvent.click(screen.getByText("±"));
    }
    currentValue = parseInt(currentValueElement.innerHTML);
    maxValue = parseInt(targetValueElement.innerHTML);  
    var expectedValue = currentValue + 10;  
    if(expectedValue>maxValue)
      expectedValue = maxValue;
    const addValueElement = screen.getByTestId("NumButton10");
    fireEvent.click(addValueElement);
    expect(parseInt(currentValueElement.innerHTML)).toBe(expectedValue);
  }
  
  //See if share button is visible
  const shareButton = screen.getByTestId("ShareButton");
  expect(shareButton).toBeInTheDocument;
  
  //Subtract 20 to make sure it bottoms out at 0
  for(let n=cnt+5;n>0;n--){
    fireEvent.click(screen.getByText("-10"));        
  }
  expect(parseInt(currentValueElement.innerHTML)).toBe(0);  
  
});
