/*

    author: Tommy Lam
    date: 2020/9/13
    description: 单链表
    usage:
        - 该js公开了指定接口SingleLinkList，只需要在window底下实例化SingleLinkList即可使用。
        - 实例化SingleLinkList需要给予首节点值

 */


(function (window) {

    class Node{
        constructor(data,nxt=null) {
            this.elm = data;
            this.nxt = nxt;
        }
    }

    class SingleLinkList{

        constructor(h_elm) {
            this.head = new Node(h_elm);
            this.length = 1;
            this.repeat = false; //元素能否重复，开启后就能添加重复元素了
        }

        /*
        @description 查找元素是否存在于链表中
        @param [elm] 查找值
         */

        find(elm){
            let fhead = this.head;
            while(fhead){
                if(fhead.elm == elm){
                    return true;
                }else{
                    fhead = fhead.nxt;
                }
            }
            return false;
        }

        /*
        @description 插入值在链表尾处
        @param [elm] 插入值
         */

        append(elm){
            if (this.repeat || !this.find(elm)){
                let fhead = this.head;
                while(fhead.nxt!=null){
                    fhead = fhead.nxt;
                }
                fhead.nxt = new Node(elm);
                this.length++;
            }else{
                throw "异常: 元素已存在！"
            }
        }

        /*
        @description 插入值在指定下标处
        @param [elm] 插入值
        @param [index] 插入位置
         */

        insert(elm,index){
            if(index>this.length){
                throw "异常: 下标超出范围！"
            }else if(this.repeat || !this.find(elm)){
                let fhead = this.head;

                let counter = 0;
                while(counter!=index){
                    fhead = fhead.nxt;
                    counter++;
                }
                let node = new Node(fhead.elm,fhead.nxt);
                fhead.elm = elm;
                fhead.nxt = node
                this.length++;
            }else{
                throw "异常: 元素已存在！"
            }

        }

        /*
        @description 默认移除第一个指定值
        @param [elm] 移除值
        @param [all] 是否移除所有相同值
         */

        remove(elm,all=true){
            let fhead = this.head;
            let Prehead = this.head;
            let of = true;
            while(this.find(elm) && fhead){
                if (fhead.elm == elm && fhead == Prehead){
                    this.head = this.head.nxt;
                    fhead = this.head
                    Prehead = this.head;
                    this.length--;
                    if (!all)break;
                }else if (fhead.elm != elm && of){
                    fhead = fhead.nxt;
                    of = false;
                }else if  (fhead.elm != elm){
                    fhead = fhead.nxt;
                    Prehead = Prehead.nxt;
                }else{
                    Prehead.nxt = fhead.nxt;
                    fhead = fhead.nxt;
                    this.length--;
                    if (!all)break;
                }
            }


        }

        /*
        @description 移除末尾值并抛出值
         */

        pop(){
            let prehead = this.head;
            let fhead = prehead.nxt;
            if (fhead){
                while(fhead.nxt){
                    prehead = prehead.nxt;
                    fhead = fhead.nxt;
                }
                prehead.nxt = null;
                this.length--;
            }else{
                return null;
            }
            return fhead.elm
        }

        /*
        @description 清空单链表
         */

        clear(){
            this.head = null;
        }

        /*
        @description 展示链表
        @param [getArr] 是否返回 值数组，默认false
        */

        show(getArr=false){
            let fhead = this.head;
            let arr = [];
            while(fhead){
                arr.push(fhead.elm);
                fhead = fhead.nxt;
            }
            return getArr?arr:arr.join(" -> ");
        }

        /*
        @description 链表是否为空
         */

        isEmpty(){
            return this.head?false:true;
        }

        /*
        @description 返回末尾的值
         */

        findLast(){
            let fhead = this.head;
            while(fhead.nxt){
                fhead = fhead.nxt;
            }
            return fhead.elm;
        }

    }


    window.SingleLinkList = SingleLinkList;
})(this.window);