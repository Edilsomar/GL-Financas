async function buscarApi(id) {
    try {
        const api = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

        // 1º Verificamos se deu certo
        if (!api.ok) {
            console.log('Postagem não encontrada!');
            return; // Para a função aqui
        }

        // 2º Se deu certo, aí sim transformamos em JSON
        const json = await api.json();
        console.log(json);

    } catch (erro) {
        console.log('Erro de conexão ou falha grave');
    }
}

buscarApi(9999);