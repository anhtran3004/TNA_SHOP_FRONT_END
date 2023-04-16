import Layout from '../layouts/Main';
import Link from 'next/link';

const RegisterPage = () => (
  <Layout>
    <section className="form-page">
      <div className="container">
        <div className="back-button-section">
          <Link href="/products">
            <a><i className="icon-left"></i> Trở lại mua hàng</a>
          </Link>
        </div>

        <div className="form-block">
          <h2 className="form-block__title">Tạo tài khoản và khám phá tiện ích</h2>
          <p className="form-block__description">Tiến hành đăng ký một tài khoản để trở thành khách hàng
          thân thiết của chúng tôi.</p>
          
          <form className="form">
            <div className="form__input-row">
              <input className="form__input" placeholder="First Name" type="text" />
            </div>
            
            <div className="form__input-row">
              <input className="form__input" placeholder="Last Name" type="text" />
            </div>
            
            <div className="form__input-row">
              <input className="form__input" placeholder="Email" type="text" />
            </div>
            
            <div className="form__input-row">
              <input className="form__input" type="Password" placeholder="Password" />
            </div>

            <div className="form__info">
              <div className="checkbox-wrapper">
                <label htmlFor="check-signed-in" className={`checkbox checkbox--sm`}>
                  <input name="signed-in" type="checkbox" id="check-signed-in" />
                  <span className="checkbox__check"></span>
                    <p>Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của Google</p>
                </label>
              </div>
            </div>

            <button type="button" className="btn btn--rounded btn--yellow btn-submit">Đăng ký</button>

            <p className="form__signup-link">
              <Link href="/login">
                <a href="#">Bạn đã là thành viên chưa?</a>
              </Link>
            </p>
          </form>
        </div>

      </div>
    </section>
  </Layout>
)
  
export default RegisterPage
  