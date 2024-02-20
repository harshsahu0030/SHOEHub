import { useNavigate } from "react-router-dom";
import { categoriesSection } from "../../data/admin/category";

const CategorySection = () => {
  const navigate = useNavigate();
  return (
    <div className="catsec_container">
      <div className="catsec_wrapper">
        <h3>
          NEW YEAR, NEW YOU{" "}
          <span>START THE YEAR WITH FITS TO BEAT YOUR GOALS</span>
        </h3>
        <div className="catesec_boxes">
          {categoriesSection &&
            categoriesSection.map((item, index) => (
              <div className="card" key={index}>
                <img className="img" src={item.imgUrl} alt="product image" />
                <div className="textBox">
                  <p className="head">{item.title.toUpperCase()}</p>
                  <span>{item.description}</span>
                  <button
                    onClick={() =>
                      navigate(
                        `/products/${item.gender.toLowerCase()}/${item.category.toLowerCase()}`
                      )
                    }
                    className="btn"
                  >
                    EXPLORE NOW
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
