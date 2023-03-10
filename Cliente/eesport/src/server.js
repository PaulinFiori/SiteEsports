export var FotoAtual;
export var NomeAtual = "";
export var SenhaAtual = "";
export var EmailAtual = "";
export var DataNascimentoAtual = "";

export function UsuarioAtual(foto, nome , senha, email, datanascimento)
{
    FotoAtual = foto
    NomeAtual = nome;
    SenhaAtual = senha;
    EmailAtual = email;
    DataNascimentoAtual = datanascimento;
}

export function LogOut()
{
    FotoAtual = null;
    NomeAtual = "";
    SenhaAtual = "";
    EmailAtual = "";
    DataNascimentoAtual = "";
}