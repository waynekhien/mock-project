import { useState, useEffect } from 'react';
import { booksApi, createBook, updateBook, deleteBook } from '../../services/api';
import type { Book } from '../../types';

interface BookForm {
  id?: string;
  name: string;
  description: string;
  short_description: string;
  list_price: number;
  original_price: number;
  book_cover: string | null;
  rating_average: number;
  images?: Array<{ base_url: string }>;
}

export const useBookManagement = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<BookForm>({
    name: "",
    description: "",
    short_description: "",
    list_price: 0,
    original_price: 0,
    book_cover: null,
    rating_average: 0,
  });

  // Fetch books on component mount
  useEffect(() => {
    const getBooks = async () => {
      try {
        console.log('Fetching books...');
        const data = await booksApi.getAll();
        console.log('Books data:', data);
        console.log('Data type:', typeof data);
        console.log('Is array:', Array.isArray(data));
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error('Data is not an array:', data);
          setError('Dữ liệu không đúng định dạng');
        }
      } catch (err: any) {
        console.error('Error fetching books:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getBooks();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'book_cover') {
      // Update images array with base_url
      setCurrentBook((prev) => ({
        ...prev,
        images: value ? [{ base_url: value }] : []
      }));
    } else {
      setCurrentBook((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Transform currentBook to API format
      const bookData = {
        ...currentBook,
        // Convert simple images array to full BookImage format
        images: currentBook.images && currentBook.images.length > 0
          ? currentBook.images.map(img => ({
              base_url: img.base_url,
              is_gallery: false,
              label: "",
              large_url: img.base_url,
              medium_url: img.base_url,
              position: 1,
              small_url: img.base_url,
              thumbnail_url: img.base_url
            }))
          : []
      };

      if (isEditing && currentBook.id) {
        // Update book
        const updatedBook = await updateBook(
          currentBook.id,
          bookData
        );
        setBooks(
          books.map((b) => (b.id === updatedBook.id ? updatedBook : b))
        );
      } else {
        // Add new book with auto-generated ID
        const maxId = books.length > 0
          ? Math.max(...books.map(book => parseInt(book.id)))
          : 0;
        const newId = (maxId + 1).toString();

        const bookWithId = {
          ...bookData,
          id: newId
        };

        const newBook = await createBook(bookWithId as Book);
        setBooks([...books, newBook]);
      }
      resetForm();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (id: string) => {
    const bookToEdit = books.find((b) => b.id === id);
    if (bookToEdit) {
      setCurrentBook({
        id: bookToEdit.id,
        name: bookToEdit.name,
        description: bookToEdit.description,
        short_description: bookToEdit.short_description,
        list_price: bookToEdit.list_price,
        original_price: bookToEdit.original_price,
        book_cover: bookToEdit.book_cover,
        rating_average: typeof bookToEdit.rating_average === 'number' ? bookToEdit.rating_average : parseFloat(bookToEdit.rating_average || '0'),
      });
      setIsEditing(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sách này?")) {
      try {
        await deleteBook(id);
        setBooks(books.filter((b) => b.id !== id));
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const resetForm = () => {
    setCurrentBook({
      name: "",
      description: "",
      short_description: "",
      list_price: 0,
      original_price: 0,
      book_cover: null,
      rating_average: 0,
      images: [],
    });
    setIsEditing(false);
  };

  return {
    books,
    loading,
    error,
    isEditing,
    currentBook,
    handleInputChange,
    handleAddOrUpdate,
    handleEdit,
    handleDelete,
    resetForm,
  };
};
