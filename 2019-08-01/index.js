class Obj {
    static name = 'obj'
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    get c() {
        return this.d();
    }

    d() {
        return 'this is d'
    }
}

const obj = new Obj('a', 'b')