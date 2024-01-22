let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  console.log(`Guest ${guest}`)
  return (<h2>Tea cup for guest #{guest}
  {console.log(`Guest no: ${guest}`)}
  </h2>);
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
