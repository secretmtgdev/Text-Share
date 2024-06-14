import FileList from './components/FileList/FileList.tsx';
import FileUpload from './components/FileUpload/FileUpload.tsx';

import './App.css';

function App() {
  return (
    <div id='app-container'>
      <FileList />
      <FileUpload />
      <textarea id='passage'></textarea>
    </div>
  );
}

export default App;
