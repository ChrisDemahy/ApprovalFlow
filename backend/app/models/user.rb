class User < ApplicationRecord
  has_many :organization_users, dependent: :destroy
  has_many :organizations, through: :organization_users
  # has_many :projects
  # has_many :workflows
  # Include default devise modules. Others available are:
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         #    :confirmable,
         :lockable,
         :timeoutable,
         :trackable
  #  :omniauthable

  # Validate Email
  validates :email,
            uniqueness: { case_sensitive: false },
            presence: true,
            allow_blank: false
  # format: { with: /^(.+)@(.+)$/, message: 'Email invalid' } # TODO Add Truemail gem for email validation

  def generate_jwt
    JWT.encode(
      { id: id, exp: 60.days.from_now.to_i },
      Rails.application.secrets.secret_key_base
    )
  end
end
