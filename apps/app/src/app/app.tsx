import tw from 'twin.macro';

const Input = tw.input`border hover:border-black`;

export const App = () => (
  <div tw="bg-blue-50" style={{ textAlign: 'center' }}>
    <Input />
    <h1>Welcome to app!</h1>
    <img
      width="450"
      src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
      alt="Nx - Smart, Fast and Extensible Build System"
    />
  </div>
);

export default App;
