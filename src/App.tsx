import Form from "./components/Form";
import FormContextProvider from "./context/FormContext";

function App() {
  return (
    <>
      <FormContextProvider>
        <Form />
      </FormContextProvider>
    </>
  );
}

export default App;
