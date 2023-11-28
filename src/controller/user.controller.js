const pool = require("../../database");
const { get } = require("../routers/user.routers");

const welcome = (req, res) => {
  res.send("Welcome to my API");
};

async function register(req, res) {
  try {
    const { first_name, last_name, email, photo, user_password } = req.body;
    const newUser = { first_name, last_name, email, photo, user_password };
    let sql = "INSERT INTO user SET ?";
    console.log("About to query with data:", newUser);
    const result = await pool.query(sql, newUser);
    console.log("Query finished with result:", result);
    console.log("This is another log message");
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const [user] = await pool.query(
    "SELECT * FROM user WHERE email = ? AND user_password = ?",
    [email, password]
  );

  if (user.length > 0) {
    const userData = { ...user[0] };
    delete userData.user_password;
    res.send({ userData, message: "User logged in" });
  } else {
    res.status(401).send("Invalid email or password");
  }
};

const getBooks = async (req, res) => {
  const { id_user } = req.query;
  const [books] = await pool.query("SELECT * FROM book WHERE id_user = ?", [
    id_user,
  ]);
  res.send(books);
};

const getSpecificBook = async (req, res) => {
  const { id_user, id_book } = req.query;

  // Convert id_user and id_book to numbers
  const userId = Number(id_user);
  const bookId = Number(id_book);

  // Filter the books based on id_user and id_book
  const filteredBooks = books.filter(
    (book) => book.userId === userId && book.id === bookId
  );

  res.json(filteredBooks);
};

const addBook = async (req, res) => {
  const { id_book, id_user, title, b_type, autor, price, photo } = req.body;
  const newBook = { id_book, id_user, title, b_type, autor, price, photo };

  // Log id_user and newBook
  console.log("id_user:", id_user);
  console.log("newBook:", newBook);

  const [result] = await pool.query("INSERT INTO book SET ?", [newBook]);
  res.send(result);
};

const updateBook = async (req, res) => {
  console.log("req.body:", req.body);
  const { id_book: bookId, title, b_type, autor, price, photo } = req.body;

  const newBook = {
    id_book: bookId,
    title,
    b_type,
    autor,
    price,
    photo,
  };

  const [result] = await pool.query("UPDATE book SET ? WHERE id_book = ?", [
    newBook,
    bookId,
  ]);
  res.send(result);
};

const deleteBook = async (req, res) => {
  const id_book = req.query.id_book;
  const [result] = await pool.query("DELETE FROM book WHERE id_book = ?", [
    id_book,
  ]);
  res.send(result);
};
const updateUser = async (req, res) => {
  const { id_user, first_name, last_name, email, photo } = req.body;
  const newUser = {
    id_user,
    first_name,
    last_name,
    email,
    photo,
  };
  const [result] = await pool.query("UPDATE user SET ? WHERE id_user = ?", [
    newUser,
    id_user,
  ]);
  res.send(result);
};

module.exports = {
  welcome,
  register,
  login,
  getBooks,
  getSpecificBook,
  addBook,
  updateBook,
  deleteBook,
  updateUser,
};
