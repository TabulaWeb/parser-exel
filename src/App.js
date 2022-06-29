import './App.css';
import Form from './components/Form';

function App() {
  return (
    <>
      <div className="header">
        <h1>Parse App</h1>
      </div>
      <div className="app-wrapper">
        <div>
          <Form />
        </div>
      </div>
    </>
  );
}

export default App;