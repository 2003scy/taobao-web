import { useEffect } from 'react';
import { useAppStore } from '../../store';
import './Services.css';

export default function Services() {
  const { messages, fetchMessages, promotions, fetchPromotions } = useAppStore();

  useEffect(() => {
    fetchMessages();
    fetchPromotions();
  }, [fetchMessages, fetchPromotions]);

  return (
    <div className="services-page">
      <div className="services-container">
        <div className="msg-panel">
          <h3>消息中心</h3>
          {messages.map((msg) => (
            <div key={msg.id} className={`msg-item ${msg.type}`}>
              <div className="msg-icon">
                {msg.type === 'aliwangwang' && '💬'}
                {msg.type === 'logistics' && '📦'}
                {msg.type === 'activity' && '🎉'}
                {msg.type === 'system' && '🔔'}
              </div>
              <div className="msg-content">
                <h4>{msg.title}</h4>
                <p>{msg.content}</p>
              </div>
              <span className="msg-time">{msg.time}</span>
            </div>
          ))}
        </div>

        <div className="marketing-panel">
          <h3>营销活动</h3>
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="promo-item"
              style={{ background: promo.color }}
            >
              <div className="promo-icon">
                <span>🏷️</span>
              </div>
              <div className="promo-content">
                <h4>{promo.title}</h4>
                <p>{promo.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="help-panel">
          <h3>帮助中心</h3>
          <div className="help-item">
            <div className="help-icon" style={{ background: '#4A90D9' }}>
              🤖
            </div>
            <div className="help-content">
              <h4>智能助手（阿里小蜜）</h4>
              <p>24小时在线解答</p>
            </div>
          </div>
          <div className="help-item">
            <div className="help-icon" style={{ background: '#50C878' }}>
              📖
            </div>
            <div className="help-content">
              <h4>自助服务</h4>
              <p>常见问题快速解答</p>
            </div>
          </div>
          <div className="help-item">
            <div className="help-icon" style={{ background: '#FFB6C1' }}>
              📝
            </div>
            <div className="help-content">
              <h4>投诉建议</h4>
              <p>意见反馈 投诉通道</p>
            </div>
          </div>
          <div className="help-item">
            <div className="help-icon" style={{ background: '#FFA500' }}>
              📞
            </div>
            <div className="help-content">
              <h4>联系客服</h4>
              <p>人工服务 热线电话</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
