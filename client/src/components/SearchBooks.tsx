import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { SAVE_BOOK } from '../utils/mutations';
import searchGoogleBooks from '../utils/API';

const SearchBooks: React.FC = () => {
  const [searchedBooks, setSearchedBooks] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedBookIds, setSavedBookIds] = useState<string[]>([]);

  const { loading, data } = useQuery(QUERY_ME);
  const [saveBook] = useMutation(SAVE_BOOK);

  // if data exists, store it in a state variable
  React.useEffect(() => {
    if (data) {
      setSavedBookIds(data.me.savedBooks.map((book: any) => book.bookId));
    }
  }, [data]);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);
      const { items } = await response.json();

      const bookData = items.map((book: any) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        link: book.volumeInfo.infoLink,
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (bookId: string) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    try {
      await saveBook({
        variables: { bookData: bookToSave },
      });

      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Search for Books!</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <input
            name="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Search for a book"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Search
        </button>
      </form>

      <div className="row">
        {searchedBooks.map((book) => {
          return (
            <div key={book.bookId} className="col-md-4 mb-3">
              <div className="card">
                {book.image ? (
                  <img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    className="card-img-top"
                  />
                ) : null}
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="small">Authors: {book.authors.join(', ')}</p>
                  <p className="card-text">{book.description}</p>
                  <a
                    href={book.link}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Book
                  </a>
                  <button
                    className="btn btn-success"
                    onClick={() => handleSaveBook(book.bookId)}
                    disabled={savedBookIds?.some(
                      (savedBookId) => savedBookId === book.bookId
                    )}
                  >
                    {savedBookIds?.some(
                      (savedBookId) => savedBookId === book.bookId
                    )
                      ? 'Book Already Saved!'
                      : 'Save This Book!'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBooks; 