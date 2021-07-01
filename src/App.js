import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import Watch from './contents/wacth';
import 'animate.css/animate.css';
import Header from './contents/header';
import Footer from './contents/footer';
function App() {
  return (
    <>
      <Header />
      <div className='App bg-info'>
        <Watch />
      </div>
      <Footer/>
    </>
  );
}

export default App;
