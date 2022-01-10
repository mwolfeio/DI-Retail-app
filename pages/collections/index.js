import { useState, useMemo, useEffect, useRef } from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import _ from "lodash";
// import debounce from "lodash.debounce";
import Link from "next/link";

import ButtonNav from "../../components/ButtonNav.js";
import Loader from "../../components/Loader.js";
import ProductList from "../../components/lists/CollectionList.js";

const GET_CUSTOMENTS = gql`
  query getCollections(
    $first: Int = 50
    $after: String = null
    $srch: String!
    $srt: CollectionSortKeys!
    $rev: Boolean!
  ) {
    collections(
      first: $first
      after: $after
      query: $srch
      sortKey: $srt
      reverse: $rev
    ) {
      edges {
        node {
          id
          handle
          title
          productsCount
          image {
            src
          }
          description
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

const SpecialPage = ({}) => {
  const [results, setResults] = useState([]);
  const [lastCursor, setLastCursor] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("RELEVANCE");
  const [reverseSort, setReverseSort] = useState(false);

  const { loading, error, data } = useQuery(GET_CUSTOMENTS, {
    fetchPolicy: "no-cache",
    variables: {
      srch: searchTerm,
      srt: sort,
      rev: reverseSort,
      after: lastCursor,
    },
  });

  const loadMore = () => {
    let lastCursor = results.at(-1).cursor;
    console.log("setting new after to: ", lastCursor);
    setLoadingMore(true);
    setLastCursor(lastCursor);
  };
  console.log("data: ", data);
  const direction = (a, b) => {
    return (
      <span
        style={{ marginLeft: "4px", opacity: 0.5 }}
        className="flex-center-center"
      >
        ({!reverseSort ? a : b}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="none"
          viewBox="0 0 24 24"
          style={{ transform: `rotate(-90deg)` }}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 6.5v11m0 0l4-4.588M12 17.5l-4-4.588"
          ></path>
        </svg>
        {!reverseSort ? b : a})
      </span>
    );
  };
  const list =
    loading && !loadingMore ? (
      <Loader />
    ) : error ? (
      `Error! ${error.message}`
    ) : results.length ? (
      results.map((prod, i) => {
        let id = prod.node.id.replace("gid://shopify/Product/", "");

        return (
          <ProductList
            index={i}
            product={{
              id: id,
              title: prod.node.title,
              description: prod.node.description,
              imgSrc: prod.node.image.src
                ? prod.node.image.src
                : "https://cdn11.bigcommerce.com/s-7i4g8cpydv/stencil/fb578d50-303a-0138-4ab9-0242ac11000d/e/8222ecd0-3e4e-013a-ceda-322a12975137/icons/icon-no-image.svg",
              productsCount: prod.node.productsCount,
            }}
          />
        );
      })
    ) : (
      <div
        className="flex-center-center"
        style={{ height: "58px", width: "100%" }}
      >
        <p>No Results</p>
      </div>
    );

  const changeHandler = (event) => {
    setSearchTerm(event.target.value);
    setSort("RELEVANCE");
  };
  const debouncedChangeHandler = useMemo(
    () => _.debounce(changeHandler, 300),
    []
  );
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);
  useEffect(() => {
    console.log("loading more: ", loadingMore);
    if (loading || !data) return;
    if (loadingMore) {
      console.log("loading more to resutls");
      setResults([...results, ...data.collections.edges]);
      setLoadingMore(false);
    } else {
      console.log("resetting resutls");
      setResults(data.collections.edges);
    }
  }, [data]);

  return (
    <main>
      <ButtonNav />
      <section>
        <h1>Collections</h1>
        <p className="light">
          Search, sort and select a collections from the list below to view edit
          their title, description and imagry.
        </p>
        <input
          onChange={debouncedChangeHandler}
          className="list-search"
          type="text"
          placeholder="Enter a product's name sku, or type..."
        />
        <ul className="large-list collection-list">
          <li className="list-header">
            <p>Image</p>
            <p
              className={`flex-center-left sortable ${
                sort == "TITLE" ? "active-sort" : ""
              }`}
              onClick={() => {
                if (sort == "TITLE") {
                  setReverseSort(!reverseSort);
                }
                setSort("TITLE");
              }}
              style={{ justifySelf: "start" }}
            >
              <span>Title</span>
              {direction("A", "Z")}
            </p>
            <p>Info</p>
            <p>Link</p>
          </li>
          {list}
        </ul>
        <div className="flex-center-center">
          {results.length < 1 || searchTerm ? (
            ""
          ) : loading || error ? (
            <Loader />
          ) : data.collections.pageInfo.hasNextPage ? (
            <button onClick={loadMore}>Load more</button>
          ) : (
            ""
          )}
        </div>
      </section>
    </main>
  );
};
export default SpecialPage;
