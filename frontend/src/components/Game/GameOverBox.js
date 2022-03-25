import { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

// components
import SendHighscoreForm from "./SendHighscoreForm";
import GameOverBoxButton from "./GameOverBoxButton";

const FormResponse = ({ isSendingHighscore }) => (
  // displays ClipLoader until server response
  // then display checkmark, it doesn't matter if it was succesful or not
  <div className="gameoverbox-item text-sky-800">
    {isSendingHighscore ? (
      // for some reason coloring does not work with only tailwind text-sky-800
      // nor only prop color="text-sky-800", but with both it does, and then it is from tailwind
      <ClipLoader color="text-sky-800" />
    ) : (
      <BsCheckCircle size={32} />
    )}
  </div>
);

const GameOverBox = ({
  gameTime,
  win,
  handleSendHighscore,
  isSendingHighscore,
  handleNewGame,
  handleRetry,
  newAvailable,
  refetchHighscores,
}) => {
  // react-hook-form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ reValidateMode: "onSubmit" });

  const [hasSubmit, setHasSubmit] = useState(false);

  const onSubmit = (data) => {
    handleSendHighscore(data);
    setHasSubmit(true);
    refetchHighscores();
  };

  const renderForm = () =>
    // displays submit form if user has not submit yet
    // otherwise display FormResponse
    !hasSubmit ? (
      <>
        <SendHighscoreForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
        />
      </>
    ) : (
      <FormResponse isSendingHighscore={isSendingHighscore} />
    );

  const displayForm = () =>
    // display submit form if win, else lose statement
    win ? (
      <>
        <div className="gameoverbox-item gameoverbox-header">
          {(gameTime / 1000).toFixed(2)}s
        </div>

        {renderForm()}
      </>
    ) : (
      <div className="gameoverbox-item gameoverbox-header">
        Failure achieved in {(gameTime / 1000).toFixed(2)}s
      </div>
    );

  // render
  return (
    <div className="gameoverbox-container">
      {/* show submit form if win */}
      {displayForm()}

      <GameOverBoxButton label="Retry Map" onClick={handleRetry} />

      {/* displays Generate New Map button if islands map */}
      {newAvailable && (
        <GameOverBoxButton
          label="Generate New Map"
          textColor="text-green-600"
          borderColor="border-green-700"
          onClick={handleNewGame}
        />
      )}

      {/* view highscore scroll to link */}
      <div className="gameoverbox-item h-12 lg:h-4">
        <button
          onClick={() =>
            window.scrollTo({
              top: 1000,
              behavior: "smooth",
            })
          }
          className="lg:hidden text-sky-800"
        >
          View highscores
        </button>
      </div>
    </div>
  );
};

export default GameOverBox;
