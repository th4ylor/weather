# 1. Conecta ao banco (se não existir, ele cria o arquivo 'dados.db')
import sqlite3

conexao = sqlite3.connect("dados1.db")
cursor = conexao.cursor()

cursor.execute(
    '''CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        CPF TEXT NOT NULL
    )
    '''
)
conexao.commit()

def criar():
    nome = input("Informe seu nome: ")
    cursor.execute("SELECT * FROM usuarios WHERE nome = ?", (nome,))
    verify = cursor.fetchone()
    if not verify:
        cpf = input("Informe seu CPF: ")
        cursor.execute("INSERT INTO usuarios (nome, CPF) VALUES (?, ?)", (nome, cpf))
        conexao.commit()
        print("Criado com sucesso.")
    else:
        print("Usuario já exste.")
    
    
def listar():
    cursor.execute("SELECT * FROM usuarios")
    resultado = cursor.fetchall()
    print("\n========Usuarios cadastrados========")
    for usuario in resultado:
        print(f"ID: {usuario[0]} | Nome: {usuario[1]} | CPF: {usuario[2]}")
      
        
def atualizar():
    id = input("Informe o ID do usuario: ")
    nome = input("Informe o novo nome: ")
    cpf = input("Informe o cpf")
    cursor.execute("UPDATE usuarios SET nome = ?, CPF = ? WHERE ID = ?", (nome, cpf, id))
    conexao.commit()
    print("Nome atualizado.")
    
    
def deletar():
    listar()
    id = int(input("\nInforme o ID do usuário: "))
    conf = input("Tem certeza que deseja excluir este usuario? (s/n)")
    if conf == "s":
        cursor.execute("DELETE FROM usuarios WHERE ID = ?",(id,))
        conexao.commit()
        print("Usuario deletado")
    else:
        print("\nExclusão cancelada.")
    
    
def buscar_por_nome():
    nome = input("Informe o nome: ")
    cursor.execute("SELECT * FROM usuarios WHERE nome LIKE ?", (f"%{nome}%",))
    resultado = cursor.fetchall()
    for nomes in resultado:
        print(nomes)
    
        
def contar_usuarios():
    cursor.execute("SELECT COUNT(*) FROM usuarios")
    resultado = cursor.fetchone()
    print(f"Atualmente existe {resultado[0]} usuarios cadastrados")
    

while True:
    print("\n [1] Criar [2] Listar [3] Atualizar [4] Deletar [5] Buscar [6] Contar [7] Sair\n")
    opcao = input("Escolha uma opção: \n")
    if opcao == '1': criar()
    elif opcao == '2': listar()
    elif opcao == '3': atualizar()
    elif opcao == '4': deletar()
    elif opcao == '5': buscar_por_nome()
    elif opcao == '6': contar_usuarios()
    elif opcao == '7': print("flw");break
    
conexao.close()
    
    