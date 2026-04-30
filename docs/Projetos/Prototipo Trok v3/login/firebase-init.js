// Suas chaves do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCdK3mwptESTvHjp66zEaOP-Uopv1przOw",
  authDomain: "trok-fe175.firebaseapp.com",
  projectId: "trok-fe175",
  storageBucket: "trok-fe175.firebasestorage.app",
  messagingSenderId: "79729710019",
  appId: "1:79729710019:web:f572bb45bba26c67e7e376"
};

// Inicializa o Firebase imediatamente
firebase.initializeApp(firebaseConfig);

// Cria as ferramentas globais para todos os arquivos JS usarem
window.db = firebase.firestore();
window.auth = firebase.auth();

console.log("🔥 Firebase Conectado com Sucesso!");