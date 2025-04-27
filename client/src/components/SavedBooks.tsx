import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const userData = data?.me || {};

  const handleDeleteBook = async (bookId: string) => {
    try {
      await removeBook({
        variables: { bookId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div className="container">
      <h2>
        {userData.savedBooks?.length
          ? `Viewing ${userData.savedBooks.length} saved ${
              userData.savedBooks.length === 1 ? 'book' : 'books'
            }:`
          : 'You have no saved books!'}
      </h2>
      <div className="row">
        {userData.savedBooks?.map((book: any) => {
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
                    className="btn btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
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

export default SavedBooks; 