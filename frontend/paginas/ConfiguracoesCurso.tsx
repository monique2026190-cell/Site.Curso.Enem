
import React from 'react';

export const ConfiguracoesCurso: React.FC = () => {

  const renderSwitch = () => (
    <label className="switch" onClick={(e) => e.stopPropagation()}>
      <input type="checkbox" />
      <span className="slider"></span>
    </label>
  );

  const Item = ({ icon, label, rightElement }: any) => (
    <div className="setting-item">
      <div className="setting-info">
        <i className={`fas ${icon}`}></i>
        <p>{label}</p>
      </div>
      {rightElement}
    </div>
  );

  return (
    <div className="h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden">
      
      <style>{`
        header{display:flex;align-items:center;padding:16px;background:#0c0f14;position:fixed;width:100%;top:0;z-index:10;border-bottom:1px solid rgba(255,255,255,0.1);height:65px;}
        header .back-btn{background:none;border:none;color:#fff;font-size:24px;cursor:pointer;padding-right:15px;}
        main{padding-top:85px;padding-bottom:100px;width:100%;max-width:600px;margin:0 auto;padding-left:20px;padding-right:20px;overflow-y:auto;flex-grow:1;}
        .settings-group{margin-bottom:20px;}
        .settings-group h2{font-size:13px;color:#8A2BE2;padding:10px 0;margin-bottom:8px;text-transform:uppercase;font-weight:800;letter-spacing:1px;}
        .setting-item{display:flex;align-items:center;justify-content:space-between;padding:16px;background-color:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);transition:0.2s;color:#fff;cursor:pointer;border-radius:14px;margin-bottom:8px;}
        .setting-item:hover{background-color:rgba(255,255,255,0.06);border-color:rgba(138,43,226,0.2);}
        .setting-info{display:flex;align-items:center;}
        .setting-info i{font-size:18px;width:30px;text-align:center;margin-right:12px;color:#8A2BE2;}
        .setting-item p{font-size:15px;font-weight:500;}
        .switch{position:relative;display:inline-block;width:44px;height:24px;}
        .switch input{opacity:0;width:0;height:0;}
        .slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#333;transition:.4s;border-radius:25px;}
        .slider:before{position:absolute;content:"";height:18px;width:18px;left:3px;bottom:3px;background-color:white;transition:.4s;border-radius:50%;}
        input:checked + .slider{background-color:#8A2BE2;}
        input:checked + .slider:before{transform:translateX(20px);}
        .delete-container{margin-top:30px;padding:0 10px 40px 10px;}
        .delete-btn{width:100%;padding:16px;background:rgba(255,77,77,0.08);border:1px solid rgba(255,77,77,0.2);color:#ff4d4d;border-radius:16px;font-weight:700;font-size:15px;cursor:pointer;transition:0.3s;display:flex;align-items:center;justify-content:center;gap:10px;}
        .delete-btn:hover{background:#ff4d4d;color:#fff;box-shadow:0 4px 20px rgba(255,77,77,0.2);}
      `}</style>

      <header>
        <button className="back-btn">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="font-bold text-lg">Configurações do Curso</h1>
      </header>

      <main>

        {/* GERAL */}
        <div className="settings-group">
          <h2>Geral</h2>

          <Item icon="fa-edit" label="Editar Título e Descrição" />
          <Item icon="fa-image" label="Alterar Imagem de Capa" />
        </div>

        {/* CONTEÚDO */}
        <div className="settings-group">
          <h2>Conteúdo</h2>

          <Item icon="fa-plus-circle" label="Adicionar Novo Módulo" />
          <Item icon="fa-sort" label="Reordenar Módulos" />
        </div>

        {/* ACESSO E PUBLICAÇÃO */}
        <div className="settings-group">
          <h2>Acesso e Publicação</h2>

          <Item 
            icon="fa-globe" 
            label="Curso Público"
            rightElement={renderSwitch()}
          />
           <Item 
            icon="fa-dollar-sign" 
            label="Monetização"
            rightElement={renderSwitch()}
          />
        </div>

        {/* ZONA DE PERIGO */}
        <div className="delete-container">
          <button className="delete-btn">
            <i className="fas fa-trash-alt"></i>
            Excluir Curso
          </button>
        </div>

      </main>
    </div>
  );
};
