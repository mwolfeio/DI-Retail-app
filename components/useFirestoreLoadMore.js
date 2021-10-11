import { useState, useEffect, useCallback } from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

const useFirestoreLoadMore = (queryFn) => {
  const [query, setQuery] = useState(null);
  const [last, setLast] = useState(null);
  const [data, setData] = useState([]);

  const [qData, loading, error] = useCollectionOnce(query);

  useEffect(() => {
    setData([]);
    setQuery(queryFn());
  }, [queryFn]);

  useEffect(() => {
    if (qData && qData.query.isEqual(query)) {
      setLast(qData.docs[qData.docs.length - 1]);
      setData([...data, ...qData.docs]);
    }
  }, [qData]);

  const more = useCallback(() => {
    setQuery(queryFn().startAfter(last));
  }, [queryFn, setQuery, last]);

  return [[data, loading, error], more];
};

export default useFirestoreLoadMore;
