from sklearn import datasets, cluster, preprocessing, metrics
from matplotlib import pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import openpyxl
import pandas as pd
from sklearn.feature_extraction import DictVectorizer

def best_fit():
	data = pd.read_excel('randbook.xlsx')
	#data = pd.read_csv('http://www-bcf.usc.edu/~gareth/ISL/Advertising.csv', index_col=0)

	# create X and y
	feature_cols = ['Size']
	X = data[feature_cols]
	y = data.Revenue

	# follow the usual sklearn pattern: import, instantiate, fit
	from sklearn.linear_model import LinearRegression
	lm = LinearRegression()
	lm.fit(X, y)

	# print intercept and coefficients
	print lm.intercept_
	print lm.coef_

	# pair the feature names with the coefficients
	zip(feature_cols, lm.coef_)

	# predict for a new observation
	X_new = pd.DataFrame({'Size': [data.Size.min(), data.Size.max()]})
	preds = lm.predict(X_new)
	data.plot(kind='scatter', x='Size', y='Revenue')
	plt.plot(X_new, preds, c='red', linewidth=2)
	plt.show()

	# calculate the R-squared
	lm.score(X, y)



def plot():
	data = pd.read_csv('http://www-bcf.usc.edu/~gareth/ISL/Advertising.csv', index_col=0)
	fig, axs = plt.subplots(1, 3, sharey=True)
	data.plot(kind='scatter', x='TV', y='Sales', ax=axs[0], figsize=(16, 8))
	data.plot(kind='scatter', x='Radio', y='Sales', ax=axs[1])
	data.plot(kind='scatter', x='Newspaper', y='Sales', ax=axs[2])

best_fit()