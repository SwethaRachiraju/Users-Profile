import './App.css';
import Users from './components/Users';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  console.log('Your process.env.PUBLIC_URL', process.env.PUBLIC_URL);

  return (
    <div className="fullWidth fullHeight">
      <Users/>
    </div>
  );
}

export default App;
