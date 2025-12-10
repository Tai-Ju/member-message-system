function add (n1,n2){
    return n1+n2;
}
function multiply (n1,n2){
    return n1*n2;
}
let lib={
    add:add, multiply:multiply
};
// 輸出預設資料 export default 資料;
export default lib;
// 輸出資料 export {變數名稱,...};
export{add,multiply};