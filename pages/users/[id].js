import { useRouter } from "next/router";

const UserDetail = ({ user }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Detail Pengguna: </h1>
      <p>
        <strong>Id:</strong> {user.id}
      </p>
      <p>
        <strong>Nama:</strong> {user.name}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Alamat:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}, {user.address.geo.lat}, {user.address.geo.lng}
      </p>
      <p>
        <strong>Telepon:</strong> {user.phone}
      </p>
      <p>
        <strong>Website:</strong> {user.website}
      </p>
      <p>
        <strong>Company:</strong> {user.company.name}, {user.company.catchPhrase}, {user.company.bs}
      </p>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
  const user = await res.json();

  return {
    props: { user },
  };
}

export default UserDetail;
