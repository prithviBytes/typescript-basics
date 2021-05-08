type fooProps = {
  username: string;
  score: number;
};

export default function Header({ username, score }: fooProps) {
  return (
    <>
      <h1>Welcome {username}</h1>
      <h5>Current Score {score}</h5>{" "}
    </>
  );
}
