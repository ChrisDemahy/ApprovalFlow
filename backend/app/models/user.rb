class User < ApplicationRecord
  belongs_to :organization
  # has_many :projects
  # has_many :workflows

  has_many :subordinates, class_name: 'User', foreign_key: 'supervisor_id'
  belongs_to :supervisor, class_name: 'User', optional: true

  has_many :steps

  # Includedevise modules.
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
