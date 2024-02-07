import { genSaltSync, compareSync, hashSync } from "bcrypt";
class Encrypt {
    private _salt = genSaltSync(10);
    encrypt(data: string): string {
        return hashSync(data, this._salt);
    }

    compare(encrypted: string, plain: string): boolean {
        return compareSync(plain, encrypted);
    }
}

export default new Encrypt();