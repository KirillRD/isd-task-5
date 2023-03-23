import 'normalize.css';
import 'primereact/resources/themes/soho-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { FakeUserDataTable } from './components/FakeUserDataTable';

const App = () => {
  return (
    <main className='p-component surface-ground text-color flex flex-column min-h-screen'>
      <FakeUserDataTable />
    </main>
  );
}

export default App;
