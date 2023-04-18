import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { useCallback } from "react";
import { FunctionComponent, createContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import { enqueueSnackbar } from "notistack";

interface IBooksContext {
  userBooks: IUserBook[];
  getBook: (id: string) => void;
  selectedBook: IGoogleBook | undefined;
  setSelectedBook: Dispatch<SetStateAction<IBooksContext["selectedBook"]>>;
  addBook: (userInput: Partial<IUserBook>) => void;
  deleteBook: (id: number) => void;
  bookSearch: (searchParams: ISearchParams) => void;
  searchResults: IGoogleBook[] | undefined;
  inUserList: (bookId: string) => IUserBook | undefined;
  updateStatus: (id: number, status: boolean) => void;
  updateRating: (id: number, newRating: number) => void;
  isSearchLoading: boolean;
}

export const BooksContext = createContext<IBooksContext>({} as IBooksContext);

interface Props {}

export const Provider: FunctionComponent<Props> = ({ children }) => {
  // const apiBaseUrl = "https://thawing-sierra-15233.herokuapp.com/api/v1";
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const googleApiUrl = "https://www.googleapis.com/books/v1/volumes";

  const { userId } = useParams();
  const { user, setUser } = useContext(UserContext);

  // All state
  const [userBooks, setUserBooks] = useState<IUserBook[]>([]);
  const [selectedBook, setSelectedBook] = useState<IGoogleBook | undefined>();
  const [searchResults, setSearchResults] = useState<
    IGoogleBook[] | undefined
  >();

  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const getUser = useCallback(async () => {
    const url = `${apiBaseUrl}/users/${userId}`;
    try {
      const response = await fetch(url, {
        method: "GET",
      }).then((res) => {
        return res.json();
      });

      setUser({ email: response.email, id: response.id });
    } catch (error) {
      enqueueSnackbar({ variant: "error", message: error.message });
      throw new Error(error);
    }
  }, [user]);

  // Because we aren't using state instead of tokens or cookies, if the page is reloaded we have to get the user again
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  const getUserBooksList = async () => {
    const url = `${apiBaseUrl}/books/?user_id=${user?.id.toString()}`;
    try {
      const response = await fetch(url, {
        method: "GET",
      }).then((res) => {
        return res.json();
      });
      setUserBooks(response);
    } catch (error) {
      enqueueSnackbar({ variant: "error", message: error.message });
      throw new Error(error);
    }
  };

  // As soon as the user signs in, get their book list
  useEffect(() => {
    if (!user) {
      return;
    }
    getUserBooksList();
  }, [user]);

  // Add a book to the user's shelf
  const addBook = async (userInput: Partial<IUserBook>) => {
    const userBook = {
      ...userInput,
      user_id: user?.id || "",
    };
    try {
      const response = await fetch(`${apiBaseUrl}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userBook),
      }).then((res) => {
        return res.json();
      });
      const addedBook = await Promise.resolve(response);
      if (addedBook) {
        const clonedBooks = [...userBooks];
        const updatedBooks = [...clonedBooks, addedBook];
        setUserBooks(updatedBooks);
      }
    } catch (error) {
      enqueueSnackbar({ variant: "error", message: error.message });
      throw new Error(error);
    }
  };

  // Remove book from user's shelf
  const deleteBook = async (id: number) => {
    try {
      await fetch(`${apiBaseUrl}/books/${id}`, {
        method: "DELETE",
      }).then((res) => {
        return res;
      });
      const clonedBooks = [...userBooks];
      const updatedBooks = clonedBooks.filter((book) => book.id !== id);
      setUserBooks(updatedBooks);
    } catch (error) {
      enqueueSnackbar({ variant: "error", message: error.message });
      throw new Error(error);
    }
  };

  // Mark a user's book as read or unread
  const updateStatus = async (id: number, status: boolean) => {
    try {
      const response = await fetch(`${apiBaseUrl}/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: status }),
      }).then((res) => {
        return res.json();
      });
      const updatedBook = await Promise.resolve(response);
      if (updatedBook) {
        const clonedBooks = [...userBooks];
        for (let i = 0; i < clonedBooks.length; i++) {
          if (clonedBooks[i].id === id) {
            clonedBooks[i].read = status;
          }
        }
        setUserBooks(clonedBooks);
      }
    } catch (error) {
      enqueueSnackbar({ variant: "error", message: error.message });
      throw new Error(error);
    }
  };

  // update user's rating for the book - between 1-5
  const updateRating = async (id: number, newRating: number) => {
    try {
      const response = await fetch(`${apiBaseUrl}/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: newRating }),
      }).then((res) => {
        return res.json();
      });
      const updatedBook = await Promise.resolve(response);
      if (updatedBook) {
        const clonedBooks = [...userBooks];
        for (let i = 0; i < clonedBooks.length; i++) {
          if (clonedBooks[i].id === id) {
            clonedBooks[i].rating = newRating;
          }
        }
        setUserBooks(clonedBooks);
      }
    } catch (error) {
      enqueueSnackbar({ variant: "error", message: error.message });
      throw new Error(error);
    }
  };

  // Google books api calls
  // For all details of a single book
  const getBook = async (id: string) => {
    const url = `${googleApiUrl}/${id}`;
    try {
      const response = await fetch(url, { method: "GET" }).then((res) =>
        res.json().then((data) => data)
      );
      const book = await Promise.resolve(response);
      setSelectedBook(book);
    } catch (error) {
      enqueueSnackbar({ variant: "error", message: error.message });
      throw new Error(error);
    }
  };

  // Search
  const bookSearch = async (searchParams: ISearchParams) => {
    setIsSearchLoading(true);
    // ?q=flowers+inauthor:keyes
    const titleQuery = searchParams.title.length
      ? `+intitle:${searchParams.title}`
      : "";
    const authorQuery = searchParams.author.length
      ? `+inauthor:${searchParams.author}`
      : "";
    const publisherQuery = searchParams.publisher.length
      ? `+inpublisher:${searchParams.publisher}`
      : "";
    const keywordQuery = searchParams.keyword || "";
    const query =
      `${googleApiUrl}?q=` +
      keywordQuery +
      titleQuery +
      authorQuery +
      publisherQuery;

    try {
      const response = await fetch(query, {
        method: "GET",
      }).then((res) => {
        return res.json();
      });
      const books = await Promise.resolve(response);
      setSearchResults(books.totalItems === 0 ? [] : books.items);
    } catch (error) {
      enqueueSnackbar({ variant: "error", message: error.message });
      throw new Error(error);
    }
    setIsSearchLoading(false);
  };

  const inUserList = (bookId: string): IUserBook | undefined => {
    return userBooks.find((book) => book.book_id === bookId);
  };

  return (
    <BooksContext.Provider
      value={{
        userBooks,
        getBook,
        selectedBook,
        setSelectedBook,
        addBook,
        deleteBook,
        bookSearch,
        searchResults,
        inUserList,
        updateStatus,
        updateRating,
        isSearchLoading,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export interface IUserBook {
  id: number;
  book_id: string;
  title: string;
  authors: string; // From Google as array, but can't store array so join/split
  subtitle: string;
  publishedDate: string;
  description: string;
  smallThumbnail: string;
  thumbnail: string;
  infoLink: string;
  user_id: number;
  read?: boolean;
  rating?: number;
  created_at: string;
  updated_at: string;
}

export interface ISearchParams {
  keyword: string;
  title: string;
  author: string;
  publisher: string;
}

export interface IGoogleBook {
  kind?: string;
  id: string;
  etag?: string;
  selfLink?: string;
  volumeInfo?: {
    title?: string;
    subtitle?: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: [
      {
        type?: string;
        identifier?: string;
      },
      {
        type?: string;
        identifier?: string;
      }
    ];
    readingModes?: {
      text?: boolean;
      image?: boolean;
    };
    pageCount?: number;
    printType?: string;
    categories?: string[];
    maturityRating?: string;
    allowAnonLogging?: boolean;
    contentVersion?: string;
    panelizationSummary?: {
      containsEpubBubbles?: boolean;
      containsImageBubbles?: boolean;
    };
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
    language?: string;
    previewLink?: string;
    infoLink?: string;
    canonicalVolumeLink?: string;
  };
  saleInfo?: {
    country?: string;
    saleability?: string;
    isEbook?: boolean;
  };
  accessInfo?: {
    country?: string;
    viewability?: string;
    embeddable?: boolean;
    publicDomain?: boolean;
    textToSpeechPermission?: string;
    epub?: {
      isAvailable?: boolean;
    };
    pdf?: {
      isAvailable?: boolean;
    };
    webReaderLink?: string;
    accessViewStatus?: string;
    quoteSharingAllowed?: boolean;
  };
  searchInfo?: {
    textSnippet?: string;
  };
}
