import { useEffect } from "react";

const BorrowList = () => {
    useEffect(() => {
        console.log("BorrowList");
    }, []);
    return <div>BorrowList</div>;
}

export default BorrowList;