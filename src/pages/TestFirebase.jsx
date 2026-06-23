import { db } from "../services/firebase";

function TestFirebase() {
  console.log("Firestore Connected:", db);

  return (
    <div>
      <h1>Firebase Connected Successfully 🎉</h1>
    </div>
  );
}

export default TestFirebase;