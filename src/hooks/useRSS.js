import { useState, useEffect } from "react";
import axios from "axios";

export default function useRSS(url) {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (window) {
      setLoading(true);
      axios.get(url).then((response) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");
        const data = [];
        xmlDoc.childNodes[0].childNodes[1].childNodes.forEach((node) => {
          if (node.nodeName === "item") {
            console.log(node.childNodes);
            data.push({
              title: node.childNodes[1].firstChild.nodeValue,
              link: node.childNodes[3].innerHTML,
              image: node.childNodes[5].childNodes[1].innerHTML,
            });
          }
        });
        console.log(data);
        setData(data);
        setLoading(false);
      });
    }
  }, []);
  return {
    loading,
    data,
  };
}
