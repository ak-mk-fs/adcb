"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from 'next/image'
import useApi from "common/hooks/useApi";
import "./style.scss";

const List = () => {
  const { list, fetchRecords, loading, hasMore } = useApi();
  const observer = useRef(null);

  const lastPostRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer?.current?.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchRecords();
        }
      });
      if (observer.current && node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );
  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);
  return (
    <>
        {list.map((item, index) => {
          return (
            <div
              key={item.id}
              ref={index === list.length - 1 ? lastPostRef : null}
              className="flex items-center list-item-wrapper"
            >
             <Image width={60} height={60} src={item.thumbnail} alt="img"/> <div className="list-item-content">
              <div className="list-item-title">{item.title}</div>
              <div className="list-content-description">{item.description}</div>
              </div>
            </div>
          );
        })}
       
    </>
  );
};

export default List;
