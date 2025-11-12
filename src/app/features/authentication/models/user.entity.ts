export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  wallet:number;

  constructor(user:{id?:number, name?: string, email?: string, password?: string,wallet?: number}) {
  this.id = user.id || 0;
  this.name = user.name||'';
  this.email = user.email||'';
  this.password = user.password ||'';
  this.wallet=user.wallet||0
  }
}
