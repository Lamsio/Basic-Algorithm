
/*
    author: Tommy Lam
    date: 2020/9/13
    description: 双链表
    usage:
        - 该js公开了指定接口DoubleLinkList，只需要在window底下实例化SingleLinkList类即可使用。
        - 实例化DoubleLinkList需要给予首节点值
 */


(function (window) {

    class Node{
        constructor(pre=null,elm,nxt=null) {
            this.pre = pre;
            this.elm = elm;
            this.nxt = nxt;
        }
    }

    class DoubleLinkList{

        constructor(elm) {
            this.head = new Node(null,elm,null);
            this.length = 1;
        }

        /*
        @description 插入值在链表尾处
        @param [elm] 插入值
         */

        append(elm){
            let prehead = this.head;
            let fhead = this.head.nxt;
            if (!fhead){prehead.nxt = new Node(prehead,elm,null);this.length++;return}
            while(fhead.nxt){
                fhead = fhead.nxt;
                prehead = prehead.nxt;
            }
            prehead = prehead.nxt
            fhead.nxt = new Node(prehead,elm,null);
            this.length++;
        }

        /*
        @warning 此方法第六感有40%可能性有bug，但目前暂未测出有bug
        @description 插入值在指定下标处
        @param [elm] 插入值
        @param [index] 插入位置
         */

        insert(elm,index) {
            if (index >= this.length) {
                throw "异常: 下标超出范围！"
            }
            ;
            let prehead = this.head;
            let fhead = this.head.nxt;

            if (index == 0) {
                this.head = new Node(null, elm, prehead);
                this.head.nxt.pre = this.head;
            } else if (fhead) {
                for (let i = 0; i < index - 1; i++) {
                    fhead = fhead.nxt;
                    prehead = prehead.nxt;
                }
                let node = new Node(prehead, elm, fhead)
                prehead.nxt = node;
                fhead.pre = node;
            } else {
                let node = new Node(prehead, elm, fhead)
                prehead.nxt = node;
            }
            this.length++;

        }

        /*
        @description 默认移除第一个指定值
        @param [elm] 移除值
         */

        remove(elm){
            let fhead = this.head;
            while(fhead){
                if (fhead.elm != elm){
                    fhead = fhead.nxt;
                }else if (fhead.elm == elm && !fhead.pre){
                    this.head = this.head.nxt;
                    this.head.pre = null;
                    this.length--;
                    return;
                }else if (fhead.elm == elm && !fhead.nxt){
                    fhead.pre.nxt = null;
                    this.length--;
                    return;
                }else{
                    fhead.pre.nxt = fhead.nxt;
                    fhead.nxt.pre = fhead.pre;
                    this.length--;
                    return;
                }
            }
        }

        /*
        @description 查找指定元素是否存在
        @param [elm] 元素
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
        @description 查找链表最后一个值
        @param [nodeOBJ] 是否返回节点对象
            - true: 返回节点对象
            - false: 返回值
         */

        findLast(nodeOBJ=false){
            let fhead = this.head;
            while(fhead.nxt){
                fhead = fhead.nxt;
            }
            return nodeOBJ?fhead:fhead.elm;
        }

        /*
        @description 移除链表的最后一个节点
         */

        pop(){
            let elm = this.findLast();
            this.findLast(true).pre.nxt = null;
            this.length--;
            return elm;
        }

        /*
        @description 链表是否为空
         */

        isEmpty(){
            return this.head?false:true;
        }


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
        @description 清空单链表
         */

        clear(){
            this.head = null;
        }

    }

    window.DoubleLinkList = DoubleLinkList;
})(window);